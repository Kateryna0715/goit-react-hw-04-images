import CSS from './index.module.css';
const { useEffect } = require('react');

const Modal = ({ image, close }) => {
  const backDropClose = e => {
    e.target === e.currentTarget && close();
  };

  useEffect(() => {
    const handleEsc = e => {
      e.code === 'Escape' && close();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [close]);

  return (
    image && (
      <div className={CSS.modalBackdrop} onClick={backDropClose}>
        <div className={CSS.modalContent}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    )
  );
};

export default Modal;
