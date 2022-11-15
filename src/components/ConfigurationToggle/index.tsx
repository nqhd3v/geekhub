import React, { useState } from "react";
import Setting from "../Icons/Setting"
import { AnimatePresence, motion } from 'framer-motion';

interface IConfigurationToggle {
  className: string;
}

const ConfigurationToggle: React.FC<IConfigurationToggle> = ({ className }) => {
  const [isShow, setShow] = useState<boolean>(false);

  return (
    <>
      <button className={className || ''} onClick={() => setShow(true)}>
        <Setting size={32} className="dark:fill-light" />
      </button>

      {/* Dialog */}

      <div className={`relative z-10 ${isShow ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <AnimatePresence>
          <motion.div
            className="fixed inset-0 bg-gray-500/50 transition-opacity backdrop-blur-sm"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1}
            }}
            animate={isShow ? 'show' : 'hidden'}
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <motion.div
                  className="pointer-events-auto relative max-w-md"
                  variants={{
                    hidden: { width: 0 },
                    show: { width: '100vw' },
                  }}
                  animate={isShow ? 'show' : 'hidden'}
                >
                  <div className="absolute top-0 left-0 -ml-8 flex pt-4 pr-2 sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 dark:text-dark hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setShow(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex h-full flex-col bg-light dark:bg-dark shadow-xl">
                    
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </AnimatePresence>
      </div>
    </>
  );
}

export default ConfigurationToggle;