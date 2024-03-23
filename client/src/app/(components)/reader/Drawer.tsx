type DrawerProps = {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};
export default ({ title, show, onClose, children }: DrawerProps, ref: any) => {
  return (
    <div
      className={`flex flex-col fixed w-80 max-w-95vw h-screen top-0 right-0 z-50 shadow-lg bg-white rounded-l-lg transform transition-transform duration-400 ease-in-out overflow-y-auto ${
        show ? 'translate-x-0 scale-100' : 'translate-x-96 scale-90'
      }`}
      ref={ref}
    >
      <div className="flex items-center justify-between w-full min-h-16 pt-1">
        <span className="pl-6 text-lg font-semibold ">{title}</span>
        <button onClick={onClose} children={'x'} />
      </div>
      <div className="w-10/12">{children}</div>
    </div>
  );
};
