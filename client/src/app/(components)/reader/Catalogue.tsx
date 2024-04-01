import { Drawer, List, ListItem } from '@material-tailwind/react';
import { NavItem } from 'epubjs';
import { Fragment, useContext } from 'react';
import { readerContext } from './Reader';
/**
 * @description: List of chapters
 */
export default function Catalogue() {
  const context = useContext(readerContext);
  if (!context) return null;
  const { isCatalogue, toggleCatalogue, catalogue, currentChapter, rendition } =
    context;

  const handleCatalogChange = (catalogueItem: NavItem) => {
    rendition.current && rendition.current.display(catalogueItem.href);
    toggleCatalogue();
  };
  return (
    <Fragment>
      <Drawer
        open={isCatalogue}
        onClose={toggleCatalogue}
        placeholder={null}
        className="overflow-y-auto bg-blue-gray-900"
      >
        {catalogue && catalogue.length > 0 ? (
          <List placeholder={null}>
            {catalogue.map((item, index) => (
              <ListItem
                // className="overflow-y-auto"
                className="text-white"
                key={index}
                onClick={() => handleCatalogChange(item)}
                color="black"
                placeholder={null}
              >
                {item.label}
              </ListItem>
            ))}
          </List>
        ) : (
          <div>No items in catalogue</div>
        )}
      </Drawer>
    </Fragment>
  );
}
