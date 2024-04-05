import { useEffect, useState } from 'react';
import { getImages } from '../api/images';
import Loader from './Loader/Loader';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import Notiflix from 'notiflix';

const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowModal, setIsShowModal] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    if (query) {
      const handleImages = async () => {
        setIsLoading(true);
        try {
          const data = await getImages(query, page);
          if (data.hits.length) {
            setImages(prev => [...prev, ...data.hits]);
            setLoadMore(page < Math.ceil(data.totalHits / 12));
          } else {
            setLoadMore(false);
            Notiflix.Notify.info(
              'Sorry, there are no images matching your search query. Please try again.'
            );
          }
        } catch (error) {
          Notiflix.Notify.failure(
            'Oops! Something went wrong! Please refresh the page and try again',
            {
              position: 'center-center',
              timeout: 2000,
              width: '500px',
              fontSize: '18px',
            }
          );
        } finally {
          setIsLoading(false);
        }
      };

      handleImages();
    }
  }, [query, page]);

  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
    setIsLoading(false);
    setIsShowModal(false);
    setLoadMore(false);
    setCurrentImage(null);
  };
  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleOpenModal = image => {
    setCurrentImage(image);
    setIsShowModal(true);
  };

  const handleCloseModal = image => {
    setCurrentImage(null);
    setIsShowModal(false);
  };

  return (
    <div style={{ padding: '0 15px', margin: '0 auto' }}>
      {<Searchbar submit={handleSubmit} />}
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} onItemClick={handleOpenModal} />}
      {!isLoading && loadMore && <Button onClick={handleLoadMore} />}
      {isShowModal && (
        <Modal close={handleCloseModal} image={currentImage}></Modal>
      )}
    </div>
  );
};

export default App;
