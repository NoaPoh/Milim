import { useEffect, useState } from 'react';
import './Home.scss';
import { useGetCategoriesList } from './hooks/useGetCategories';
import { CategoryCard } from './components/CategoryCard/CategoryCard.tsx';
import addIcon from '../../assets/images/categories/add.png';
import AnimalIcon from '../../components/AnimalIcon/AnimalIcon';
import { useUser } from '../../context/UserContext';
import { AwardType } from '../../constants/awards.types.ts';
import CreateCategoryModal from './components/CreateCategoryModal/CreateCategoryModal.tsx';

const Home = () => {
  const { data: categories } = useGetCategoriesList(true);
  const { user } = useUser();
  const { activeAwards } = user || {};
  const [openCreateCategoryModal, setOpenCreateCategoryModal] = useState(false);

  return (
    <>
      <div className="home__container">
        {user && (
          <div className="home__user-details">
            <AnimalIcon
              iconWidth={140}
              path={activeAwards?.[AwardType.PROFILE_ICON] || ''}
              frame={activeAwards?.[AwardType.ICON_FRAME] || ''}
              background={activeAwards?.[AwardType.ICON_BACKGROUND] || ''}
            />
            <p className="text-xl text-gray-700 mb-6">
              שלום {user.username}, <br /> איפה אנחנו עכשיו?
            </p>
          </div>
        )}
        {categories && (
          <div className="home__category-grid">
            <div id="plus">
              <img
                onClick={() => setOpenCreateCategoryModal(true)}
                src={addIcon}
                alt="Add new category"
                className="add-icon object-cover"
              />
            </div>
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                id={category.id}
                name={category.name}
                picture={category.picture}
              />
            ))}
          </div>
        )}
      </div>
      {openCreateCategoryModal && (
        <CreateCategoryModal
          onClose={() => setOpenCreateCategoryModal(false)}
        />
      )}
    </>
  );
};

export default Home;
