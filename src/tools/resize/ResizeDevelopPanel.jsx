import React from 'react'
import { Lock, Unlock } from 'lucide-react'
import { 
    SidebarSection,
    StatHighlight,
    ProgressBar,
    StatRowList, 
} from '../../components/tool-comps/ToolSidebar'

const ResizeDevelopPanel = (props) => {

    const { width, height, setWidth, setHeight, lockAspect, setLockAspect, aspectRatio, mode, setMode, isResizing, MODES } = props

    return (
        <div className='flex flex-col gap-6 mb-10 md:mb-2'>
            <SidebarSection eyebrow='Resize' description='Set target dimensions, then resize your batch.' />

            <div className='flex flex-col gap-3'>
                <div className='flex justify-between items-center'>
                    <span className='text-sm tracking-widest text-neutral-400 uppercase'>Dimensions</span>
                    <button
                        onClick={() => setLockAspect(!lockAspect)}
                        disabled={isResizing}
                        className='text-neutral-400 hover:text-amber-47 disabled:opacity-40 cursor-pointer transition-colors duration-200'
                        title={lockAspect ? 'Aspect ratio locked' : 'Aspect ratio unlocked'}
                    >
                        {lockAspect ? <Lock size={16} /> : <Unlock size={16} />}
                    </button>
                </div>

                <div className='flex items-center gap-2'>
                    <input
                        type='number'
                        min='1'
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        disabled={isResizing}
                        className='w-full bg-neutral-900 border border-neutral-700 focus:border-amber-47 outline-none rounded-lg px-3 py-2 text-sm text-neutral-200 disabled:opacity-40'
                    />
                    <span className='text-neutral-600'>×</span>
                    <input
                        type='number'
                        min='1'
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        disabled={isResizing}
                        className='w-full bg-neutral-900 border border-neutral-700 focus:border-amber-47 outline-none rounded-lg px-3 py-2 text-sm text-neutral-200 disabled:opacity-40'
                    />
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <span className='text-sm tracking-widest text-neutral-400 uppercase'>Mode</span>
                <div className='flex gap-2'>
                    {MODES.map((m) => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            disabled={isResizing}
                            className={`flex-1 py-2 rounded-lg text-xs uppercase tracking-wider cursor-pointer transition-colors duration-200 disabled:opacity-40 ${
                                mode === m.id
                                    ? 'bg-amber-47 text-black font-semibold'
                                    : 'bg-neutral-900 border border-neutral-700 text-neutral-400 hover:border-amber-47 hover:text-amber-47'
                            }`}
                        >
                            {m.label}
                        </button>
                    ))}
                </div>
                <p className='text-sm text-neutral-400'>
                    {mode === 'fit' && 'Fits within the specified dimensions, retaining aspect ratio (may leave empty space)'}
                    {mode === 'crop' && 'Crops to fill the specified dimensions (may cut off parts of the image)'}
                    {mode === 'exact' && 'Stretches to fill the specified dimensions, ignoring aspect ratio (may distort the image)'}
                </p>
            </div>
        </div>
    )
}

export default ResizeDevelopPanel