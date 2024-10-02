import React from 'react';

export default function Test() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
      <div className="bg-white dark:bg-boxdark dark:text-white p-4 rounded-md shadow-2 text-slate-950">
        <h1 className="text-xl font-semibold">Card 1</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          voluptates.
        </p>
      </div>

      <div className="bg-white dark:bg-boxdark dark:text-white p-4 rounded-md shadow-2">
        <h1 className="text-xl font-semibold">Card 2</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          voluptates.
        </p>
      </div>

      <div className="bg-white dark:bg-boxdark dark:text-white p-4 rounded-md shadow-2">
        <h1 className="text-xl font-semibold">Card 3</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          voluptates.
        </p>
      </div>

      <div className="bg-white dark:bg-boxdark dark:text-white p-4 rounded-md shadow-2">
        <h1 className="text-xl font-semibold">Card 4</h1>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
          voluptates.
        </p>
      </div>
    </div>
  );
}
