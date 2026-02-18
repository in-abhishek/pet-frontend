
const FilterSearch = ({nameFilter,setNameFilter,nameOptions}) => {
    return (
            <select value={nameFilter} onChange={e => setNameFilter(e.target.value)}>
                <option value="">All Names</option>
                {nameOptions.map(name => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
    )
}

export default FilterSearch