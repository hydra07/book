import { Drawer } from '@material-tailwind/react';
import { Fragment, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isToggle: boolean;
  onToggle: () => void;
}
/**
 *
 * @param children: ReactNode
 * @param isToggle: boolean
 * @param onToggle: () => void
 * @returns
 */
export default function RightDrawer({ children, isToggle, onToggle }: Props) {
  return (
    <Fragment>
      <Drawer
        className="bg-white overflow-y-auto fixed"
        placement="right"
        open={isToggle}
        onClose={onToggle}
        placeholder={null}
      >
        {children}
      </Drawer>
    </Fragment>
  );
}
