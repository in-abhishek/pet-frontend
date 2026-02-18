import type { ChangeEvent } from 'react'
import { SearchProductIcon } from '../../assets/iconset'
import type { InputSearchProps } from '../../utils/AuthUtils';

const InputSearch = ({ onSearch }: InputSearchProps) => {
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    }

    return (
        <div className="px-4 py-2 max-w-60 w-full border bg-[#F9FAFB] border-gray-300 rounded-lg flex gap-2.5 justify-start items-center">
            <span>
                <SearchProductIcon />
            </span>
            <input
                type="text"
                onChange={handleChange}
                placeholder="Search name, breed..."
                className="w-full text-xs md:text-base placeholder-gray-500 focus:outline-none focus:border-transparent bg-transparent"
            />
        </div>
    )
}
export default InputSearch