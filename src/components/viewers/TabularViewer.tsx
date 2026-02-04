/**
 * TabularViewer - Displays tab-delimited data in a table format
 * with column headers and tooltips from YAML definitions
 */

import { Table } from 'lucide-react';
import { ColumnDefinition } from '../../types';

interface TabularViewerProps {
    content: string;
    columns?: ColumnDefinition[];
    filename?: string;
    language?: string;
    className?: string;
}

const TabularViewer: React.FC<TabularViewerProps> = ({
    content,
    columns,
    filename,
    language = 'TEXT',
    className = ''
}) => {
    // Parse content into rows, filtering out comments and empty lines
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    const rows = lines.map(line => line.split('\t'));

    // Determine the number of columns from data if not provided
    const maxColumns = Math.max(...rows.map(row => row.length));

    return (
        <div className={`bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm ${className}`}>
            {/* Header */}
            <div className="flex items-center px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="inline-flex p-1.5 rounded-md bg-emerald-100">
                        <Table className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-gray-900">
                            {filename || 'File Content Example'}
                        </h4>
                        <p className="text-xs text-gray-500">
                            {lines.length} line{lines.length !== 1 ? 's' : ''} • {language} • Tabular
                        </p>
                    </div>
                </div>
            </div>

            {/* Table Content */}
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm font-mono">
                    {/* Column Headers */}
                    {columns && columns.length > 0 && (
                        <thead className="bg-gray-100 border-b border-gray-200">
                            <tr>
                                <th className="px-2 py-2 text-xs text-gray-400 text-center border-r border-gray-200 w-10">
                                    #
                                </th>
                                {columns.map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="px-3 py-2 text-left text-xs font-semibold text-gray-700 border-r border-gray-200 last:border-r-0"
                                        title={col.tooltip}
                                    >
                                        <span className="cursor-help border-b border-dotted border-gray-400">
                                            {col.name}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                    )}

                    {/* Data Rows */}
                    <tbody>
                        {rows.map((row, rowIdx) => (
                            <tr
                                key={rowIdx}
                                className={rowIdx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                            >
                                {/* Line Number */}
                                <td className="px-2 py-1 text-xs text-gray-400 text-center border-r border-gray-200 select-none">
                                    {rowIdx + 1}
                                </td>
                                {/* Data Cells */}
                                {row.map((cell, cellIdx) => (
                                    <td
                                        key={cellIdx}
                                        className="px-3 py-1 text-gray-800 border-r border-gray-200 last:border-r-0 whitespace-nowrap"
                                        title={columns?.[cellIdx]?.tooltip}
                                    >
                                        {cell || '\u00A0'}
                                    </td>
                                ))}
                                {/* Fill empty cells if row has fewer columns */}
                                {Array.from({ length: Math.max(0, (columns?.length || maxColumns) - row.length) }).map((_, i) => (
                                    <td key={`empty-${i}`} className="px-3 py-1 border-r border-gray-200 last:border-r-0">
                                        {'\u00A0'}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Column Legend (if columns defined) */}
            {columns && columns.length > 0 && (
                <div className="px-4 py-2 bg-gray-50 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                        💡 Hover over column headers for descriptions
                    </p>
                </div>
            )}
        </div>
    );
};

export default TabularViewer;
