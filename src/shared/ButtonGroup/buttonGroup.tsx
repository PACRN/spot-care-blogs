export interface buttonGroupProps {
  fieldName: string;
  className: string;
  onClick: () => void;
  isDisabled: boolean;
}

const ButtonGroup = ({ props }: { props: buttonGroupProps[] }) => {
  return (
    <div className="w-full flex items-center justify-between cursor-pointer">
      {props.map((e) => (
        <button className={e.className} onClick={e.onClick} disabled={e.isDisabled}>
          {e.fieldName}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
