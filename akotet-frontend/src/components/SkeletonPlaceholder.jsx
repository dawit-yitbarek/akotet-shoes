import React from "react";

export function CardSkeleton() {
    return (
        <div className="animate-pulse bg-[#1A1A1A] rounded-xl border border-[#481E14]">
            <div className="w-full h-48 bg-[#2A2A2A] rounded-t-xl"></div>
            <div className="p-4 space-y-2">
                <div className="h-4 w-1/2 bg-[#2A2A2A] rounded"></div>
                <div className="h-4 w-1/3 bg-[#2A2A2A] rounded"></div>
                <div className="h-4 w-1/4 bg-[#2A2A2A] rounded"></div>
                <div className="h-10 w-full bg-[#2A2A2A] rounded mt-4"></div>
            </div>
        </div>
    );
}

export function TableSkeletonRow() {
    return (
        <tr className="border-b border-[#1A1A1A] animate-pulse">
            <td className="p-2">
                <div className="h-12 w-12 bg-[#333] rounded" />
            </td>
            <td className="p-2">
                <div className="h-4 w-20 bg-[#333] rounded" />
            </td>
            <td className="p-2">
                <div className="h-4 w-16 bg-[#333] rounded" />
            </td>
            <td className="p-2">
                <div className="h-4 w-12 bg-[#333] rounded" />
            </td>
            <td className="p-2">
                <div className="h-4 w-24 bg-[#333] rounded" />
            </td>
        </tr>
    );
};


export function OrderSkeleton() {
    return (
        <div className="bg-[#1A1A1A] border border-[#2a2a2a] rounded-xl shadow animate-pulse">
            <div className="h-48 w-full bg-[#2a2a2a]" />
            <div className="p-4 space-y-3">
                <div className="h-4 w-2/3 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-1/2 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-3/4 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-1/2 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-2/3 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-2/5 bg-[#2a2a2a] rounded" />
                <div className="h-8 w-full bg-[#2a2a2a] rounded mt-4" />
            </div>
        </div>
    );
};
