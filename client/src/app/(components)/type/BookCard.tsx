import { useState } from 'react';
import Image from 'next/image';
import Book from '@/types/book';
import RatingBar from '../book/RatingBar';

export default ({book}: { book: Book }) => {

    const [expandedDescriptionId, setExpandedDescriptionId] = useState<number | null>(null);
  
    const toggleDescription = (id: number) => {
      if (expandedDescriptionId === id) {
        setExpandedDescriptionId(null);
      } else {
        setExpandedDescriptionId(id);
      }
    };

    const handleClick = () => {
        window.location.href = `/bookdetail/${book.id}`;
    };

    return (
        
        <div className="p-10 rounded-md bg-gray-900">
                
          <div key={book.id} className="flex space-x-4">
            <Image className="w-48 h-auto rounded-md" src={book.imageUrl as string} alt={book.title} width={480} height={700} onClick={handleClick}/>
            <div>
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p><strong>Author:</strong> {book.author.name}</p>
              {expandedDescriptionId === book.id ? (
                <p>{book.description}</p>
              ) : (
                <p>{book.description ? book.description.slice(0, 100) + '...' : 'No description available'}</p>
              )}
              <button
                className="text-blue-500 underline"
                onClick={() => toggleDescription(book.id)}
              >
                {expandedDescriptionId === book.id ? 'Ẩn bớt' : 'Xem thêm'}
              </button>
            </div>
          </div>
            
        </div>
    );
};

