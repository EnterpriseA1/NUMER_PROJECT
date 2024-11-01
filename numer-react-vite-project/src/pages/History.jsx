import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarComponent from '../component/Navbar';
import { Table, RefreshCcw, Calendar, Hash, ChevronUp, ChevronDown } from 'lucide-react';
import MathEquation from "../component/MathEquation";

const BisectionHistory = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortConfig, setSortConfig] = useState({ key: 'createdAt', direction: 'desc' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get('http://numer-serverside.vercel.app/api');
            setData(response.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to fetch calculation history. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const sortData = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedData = [...data].sort((a, b) => {
            if (key === 'createdAt') {
                return direction === 'asc' 
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            }
            if (key === 'result' || key === 'error') {
                return direction === 'asc'
                    ? parseFloat(a[key]) - parseFloat(b[key])
                    : parseFloat(b[key]) - parseFloat(a[key]);
            }
            return direction === 'asc'
                ? a[key].toString().localeCompare(b[key].toString())
                : b[key].toString().localeCompare(a[key].toString());
        });

        setData(sortedData);
    };

    const getSortIcon = (key) => {
        if (sortConfig.key === key) {
            return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
        }
        return null;
    };

    if (loading) {
        return (
            <>
                <NavbarComponent />
                <div className="flex flex-col items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    <p className="mt-4 text-gray-600">Loading calculation history...</p>
                </div>
            </>
        );
    }

    return (
        <>
            <NavbarComponent />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Table className="w-6 h-6" />
                        <h1 className="text-2xl font-bold text-gray-800">Calculation History</h1>
                    </div>
                    <button 
                        onClick={fetchData}
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <RefreshCcw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                        <p>{error}</p>
                    </div>
                )}

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('createdAt')}
                                        >
                                            <Calendar className="w-4 h-4" />
                                            Date/Time
                                            {getSortIcon('createdAt')}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('Equation')}
                                        >
                                            Equation
                                            {getSortIcon('Equation')}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('x_start')}
                                        >
                                            XL
                                            {getSortIcon('x_start')}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('x_end')}
                                        >
                                            XR
                                            {getSortIcon('x_end')}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('result')}
                                        >
                                            Result
                                            {getSortIcon('result')}
                                        </button>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        <button 
                                            className="flex items-center gap-1"
                                            onClick={() => sortData('error')}
                                        >
                                            Error (%)
                                            {getSortIcon('error')}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {data.map((item, index) => (
                                    <tr 
                                        key={item._id} 
                                        className={`hover:bg-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <MathEquation equation={`$${item.Equation}$`} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Number(item.x_start).toFixed(4)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Number(item.x_end).toFixed(4)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Number(item.result).toPrecision(7)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {Number(item.error).toFixed(6)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {data.length === 0 && !error && (
                    <div className="text-center py-8">
                        <Hash className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No calculations yet</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Start by making some calculations in the Bisection Calculator.
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default BisectionHistory;