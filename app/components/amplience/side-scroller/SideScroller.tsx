import {ChevronLeftIcon, ChevronRightIcon} from '@heroicons/react/24/solid';
import {type ReactNode, useEffect, useRef, useState} from 'react';
import IconButton from '../IconButton';

type SideScrollerProps = {
  children: ReactNode;
};

const SideScroller = ({children}: SideScrollerProps) => {
  const [isScrollable, setIsScrollable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction = 1) => {
    scrollRef.current?.scrollBy({
      top: 0,
      left: direction * window.innerWidth,
      behavior: 'smooth',
    });
  };

  const handleScrollState = (element: HTMLDivElement) => {
    const scrollWidth = element?.scrollWidth;
    const clientWidth = element?.clientWidth;
    if (scrollWidth && clientWidth) {
      setIsScrollable(Boolean(scrollWidth > clientWidth));
    }
  };

  useEffect(() => {
    // setup observer to handle scroll element resize changes
    const observer = new MutationObserver(() => {
      if (scrollRef.current) {
        handleScrollState(scrollRef.current);
      }
    });

    if (scrollRef.current) {
      // observer the scoll element for changes
      observer.observe(scrollRef.current, {
        childList: true,
        subtree: true,
      });

      // set the initial scrollable state
      handleScrollState(scrollRef.current);
    }
    return () => {
      // clean up observer when done
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="relative">
        <div
          className="flex flex-row overflow-x-scroll whitespace-nowrap snap-mandatory snap-x scroll-p-16 md:scroll-p-0"
          ref={scrollRef}
        >
          {children}
        </div>
        <div
          className={`hidden ${
            isScrollable ? 'md:block' : ''
          } absolute top-[40%] left-0`}
        >
          <IconButton ariaLabel="Scroll left" onClick={() => scroll(-1)}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <div
          className={`hidden ${
            isScrollable ? 'md:flex' : ''
          } absolute top-[40%] right-0`}
        >
          <IconButton ariaLabel="Scroll right" onClick={() => scroll(1)}>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default SideScroller;
