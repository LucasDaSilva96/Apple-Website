import { footerLinks } from '../constants';

export default function Footer() {
  return (
    <footer className='py-5 sm:px-10 px-5'>
      <div className='screen-max-width'>
        <div>
          <p className='font-semibold text-gray text-xs'>
            More ways to shop
            <span className='underline text-blue cursor-pointer'>
              {' '}
              Find an apple Store
            </span>{' '}
            or
            <span className='cursor-pointer underline text-blue'>
              {' '}
              Other retailer
            </span>{' '}
            near you.
          </p>
          <p className='font-semibold text-gray text-xs'>
            Or call 080080-040-1996
          </p>

          <div className='bg-neutral-700 my-5 h-[1px] w-full' />

          <div className='flex md:flex-row flex-col md:items-center justify-between'>
            <p className='font-semibold text-gray text-xs'>
              Copyright &#169; {new Date().getFullYear()} Apple Inc. All rights
              reserved.
            </p>
            <div className='flex flex-wrap gap-1 items-center'>
              {footerLinks.map((link, i) => (
                <p
                  className='cursor-pointer font-semibold text-gray text-xs'
                  key={link}
                >
                  {i === 0 ? '' : <span className='mx-1'>|</span>}
                  {link}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
