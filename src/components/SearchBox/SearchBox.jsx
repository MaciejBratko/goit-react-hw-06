import css from "./SearchBox.module.css";

const SearchBox = ({ value, onFilter }) => {
  return (
    <div>
      <p>Find contacts by name</p>
      <input
        type="text"
        value={value}
        onChange={(e) => onFilter(e.target.value)}
      ></input>
    </div>
  );
};

export default SearchBox;
