import ReactDom from 'react-dom';

const Modal = ({children,open,setOpen}) => {
    if(!open) return null;

  return ReactDom.createPortal(
    <div className='fixed inset-0 flex justify-center items-center z-50'>
        {/* Modal Backgrond */}
        <div className='w-full h-full  bg-black opacity-50 absolute top-0 left-0' onClick={()=>setOpen(false)}></div>
        {/* Modal Content */}
        <div className='bg-white p-5 shadow-lg relative z-10'>
            <button className='absolute top-3 right-3 bg-gray-200 px-3 py-1 rounded-full' onClick={()=>setOpen(false)} >&times;</button>
            {children}
        </div>
    </div>,

    // location to render modal
    document.getElementById("root")
  )
}

export default Modal