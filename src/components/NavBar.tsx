import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

export default function NavBar() {
  return (
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>
      <nav className='flex w-full screen-max-width'>
        <aside>
          <img src={appleImg} alt='Apple logo' width={14} height={18} />
        </aside>
        <ul className='flex flex-1 justify-center max-sm:hidden'>
          {navLists.map((item, index) => (
            <li
              className='px-5 text-sm cursor-pointer text-gray transition-colors will-change-auto duration-200 hover:text-slate-50'
              key={index}
            >
              {item}
            </li>
          ))}
        </ul>

        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 pr-2'>
          <img
            className='cursor-pointer'
            src={searchImg}
            alt='Search icon'
            width={18}
            height={18}
          />
          <img
            className='cursor-pointer'
            src={bagImg}
            alt='Bag icon'
            width={18}
            height={18}
          />
        </div>
      </nav>
    </header>
  );
}
