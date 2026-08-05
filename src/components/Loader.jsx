import React, { forwardRef } from "react";

const Loader = forwardRef((props, ref) => {
    return (
        <div className="fixed inset-0 bg-neutral-950 flex items-center justify-center z-50" ref={ref}>
            <div className="w-12 h-12 border-4 border-neutral-700 border-t-amber-47 rounded-full animate-spin"></div>
        </div>
    );
});

export default Loader;