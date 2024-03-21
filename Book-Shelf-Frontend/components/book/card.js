import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"; // Importing custom card component
const Bookcard = ({ book }) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt={book.title}
                    className="object-cover rounded-xl"
                    src={`${process.env.CLOUDINARY_IMAGE_URL}${book.image}`}
                    // src={`https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg?size=626&ext=jpg&ga=GA1.1.1222169770.1710979200&semt=sph`}
                    width={270}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
             

                <div className="flex justify-between p-3">
                    <h2 className="font-bold text-2xl">{book.title}</h2> 
                    <h4 className="text-base">{book.genre?.name}</h4>
                </div>
                <h4 className="text-base p-3">{book.author}</h4> 

            </CardBody>
        </Card>
    );
};
export default Bookcard;
