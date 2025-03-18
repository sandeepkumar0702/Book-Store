import React from 'react';
import { IoStar } from 'react-icons/io5';

type BookType = {
  title: string;
  author: string;
  rating: number;
  price: number;
  pic: any;
};

type BookProps = {
  book: BookType;
};

function Books({ book }: BookProps) {
  return (
    <div className='flex flex-col w-full max-w-[240px] h-[275px] border border-gray-300 hover:shadow-lg'>
      <div className='w-full h-[172px] flex items-center justify-center bg-[#F5F5F5]'>
        <img
          loading='lazy'
          className='w-24 object-contain'
          src={book?.pic}
          alt={book?.title}
        />
      </div>
      <div className='w-full p-4'>
        <p className='text-md font-semibold'>{book?.title}</p>
        <p className='text-[#878787] text-xs font-normal mb-1'>by {book?.author}</p>
        <div className='flex text-xs items-center gap-1'>
          <div className='flex h-5 px-1 items-center justify-center text-white text-xs bg-[#388E3C]'>
            <span>{book?.rating}</span>
            <IoStar className='text-white text-xs ml-0.5' />
          </div>
          <p className='text-[#878787]'>(20)</p>
        </div>
        <div className='mt-1 flex items-center space-x-2'>
          <p className='font-semibold'>Rs. {book?.price}</p>
          <p className='text-[#878787] text-xs line-through'>Rs. 2000</p>
        </div>
      </div>
    </div>
  );
}

export default Books;

// import React from 'react'
// import { IoStar } from 'react-icons/io5'

// type book ={
//   title : string,
//   author: string,
//   rating : number,
//   price: number,
//   pic: any,
// }

// type bookProps = {
//   book : book
// }
// function Books({book}: bookProps) {
//   return (
//     <div className='flex flex-col w-full max-w-[240px] h-[275px] border border-gray-300 hover:shadow-lg '>
//       <div className='w-full h-[172px] flex items-center justify-center bg-[#F5F5F5] '>
//         <img loading='lazy' className='w-24 object-contain' src={book?.pic} alt={book?.title}/>
//       </div>
//       <div className='w-full p-4'>
//         <p className=' text-md font-semibold' > {book?.title} </p>
//         <p className=' text-[#878787] text-xs font-normal mb-1 ' >by {book?.author} </p>
//         <div className='flex text-xs items-center gap-1'>
//           <div className='flex h-5 px-1 items-center justify-center text-white text-xs bg-[#388E3C] ' >
//             <span> {book?.rating} </span>
//             <IoStar className=' text-white text-xs ml-0.5 ' />
//           </div>
//           <p className='text-[#878787] '>(20)</p>
//         </div>
//         <div className=' mt-1 flex items-center space-x-2 '>
//           <p className='font-semibold'>Rs. {book?.price} </p>
//           <p className='text-[#878787] text-xs line-through'>Rs. 2000</p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Books