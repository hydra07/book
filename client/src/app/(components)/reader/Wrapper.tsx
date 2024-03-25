interface Props {
  x: number;
  y: number;
  width: number;
  height: number;
  isReverse: boolean;
}

const contextmenuWidth = 160;

const Wrapper = ({ x, y, width, height, isReverse }: Props) => {
  return (
    <div
      className={`absolute left-${
        window.innerWidth < x + contextmenuWidth ? 'full' : `${x}px`
      } top-${
        window.innerHeight < y + 40 ? 'full' : `${y}px`
      } w-${width} h-${height} box-border ${
        width > 0 ? 'p-4' : ''
      } rounded-8 bg-black bg-opacity-80 shadow-regular z-menu relative`}
    >
      <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
        {/* Your content here */}
      </div>
      {width > 0 && (
        <div
          className={`absolute left-80 ${
            isReverse ? 'bottom-0' : 'top-0'
          } transform -translate-x-8 border-8 border-solid border-black border-opacity-0 ${
            isReverse
              ? 'border-top-solid border-black border-opacity-80'
              : 'border-bottom-solid border-black border-opacity-80'
          } z-1`}
        ></div>
      )}
    </div>
  );
};
