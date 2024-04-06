import { FC } from 'react';
import { v4 } from 'uuid';

import NotFound from './not-found';
import { ModalObjectBodyProps } from './select-object-modal.types';
import ObjectModalItem from './select-object-modal-item';

const ModalObjectBody: FC<ModalObjectBodyProps> = ({
  objects,
  handleSelectObject,
}) => (
  <>
    {objects && objects.length ? (
      objects?.map((object) => (
        <ObjectModalItem
          key={v4()}
          selected={false}
          onClick={() => handleSelectObject(object)}
          {...object}
        />
      ))
    ) : (
      <NotFound />
    )}
  </>
);

export default ModalObjectBody;
