/* eslint-disable react/prop-types */

export default function Button({ children, icon: Icon, size = 24, onClick, className = "custom-bg-color py-2 px-4 hover-custom-bg-color" }) {
    return (
        <>
            <button onClick={onClick ? onClick : () => { }} className="border-none text-white rounded font-medium group hover:text-gray-200 w-full">
                <span className={`flex items-center w-max mx-auto justify-center gap-2 group-hover:-translate-y-[2px] hover:scale-100 [transition:0.5s] rounded ${className} `}>
                    {
                        children && <>{children} </>
                    }
                    {
                        Icon && <Icon size={size} />
                    }
                </span>
            </button>
        </>
    )
}
