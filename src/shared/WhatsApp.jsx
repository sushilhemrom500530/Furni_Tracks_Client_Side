
const WhatsApp = () => {
    return (
        <div
            className="fixed bottom-0 right-0 mb-20 mr-5"
            style={{ zIndex: "6", left: "initial" }}
        >
            <a
                href="https://wa.me/+8801767122497?text=Hellow, I Need Some Information!"
                target="_blank"
                rel="noreferrer"
                className="text-white"
            >
                <img
                    src="https://i.ibb.co/k1PCxHP/WhatsApp.webp"
                    className="w-10 cursor-pointer rounded-full hover:scale-110 transition duration-200"
                />
            </a>
        </div>
    );
};

export default WhatsApp;