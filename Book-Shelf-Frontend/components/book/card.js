import { Card, CardHeader, CardBody, Image } from "@nextui-org/react"; // Importing custom card component
const Bookcard = ({ book }) => {
    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <p className="text-tiny uppercase font-bold">{book.genre}</p>
                <h4 className="font-bold text-large">{book.title}</h4>
                <small className="text-default-500">{book.author}</small>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <Image
                    alt={book.title}
                    className="object-cover rounded-xl"
                    src={book.imageUrl}
                    width={270}
                />
            </CardBody>
        </Card>
    );
};
export default Bookcard;
