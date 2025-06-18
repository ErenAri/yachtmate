'use client';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const getPageLink = (page: number) => `/yachts?page=${page}`;

  return (
    <div className="flex justify-center mt-10 space-x-2">
      {Array.from({ length: totalPages }, (_, index) => {
        const pageNum = index + 1;
        return (
          <Link
            key={pageNum}
            href={getPageLink(pageNum)}
            className={`px-4 py-2 rounded-md ${
              currentPage === pageNum
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-800 dark:bg-gray-800 dark:text-white'
            }`}
          >
            {pageNum}
          </Link>
        );
      })}
    </div>
  );
}
