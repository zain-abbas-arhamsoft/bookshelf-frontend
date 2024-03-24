import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import { selectAccessToken } from '@/redux/features/user/slice';
import { useSelector } from "react-redux";
import { useBookStatusMutation } from "@/components/hooks/user";
import { useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { saveBookId } from "@/redux/features/book/slice";
const Bookcard = ({ book }) => {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const accessToken = useSelector(selectAccessToken);
    let updateBookStatus = useBookStatusMutation(accessToken);
    const getBookId = async (book) => {
        let newStatus;
        if (book.status === 'Plan to Read') {
            newStatus = 'Reading';
        } else if (book.status === 'Reading') {
            newStatus = 'Completed';
        }
        let data = {
            status: newStatus,
            bookId: book?._id
        }
        dispatch(saveBookId(book?._id))
        await updateBookStatus.mutateAsync(data);
        queryClient.invalidateQueries("books");
    };

    return (
        <Card className="py-4">
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                <Image
                    alt={book.title}
                    className="object-cover rounded-xl h-44"
                    src={`${process.env.CLOUDINARY_IMAGE_URL}${book.image}`}
                    width={270}
                />
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="flex justify-between p-3">
                    <h2 className="font-bold text-2xl">{book.title}</h2>
                    <h4 className="text-base">{book.genre?.name}</h4>
                </div>
                <h4 className="text-base p-3">{book.author}</h4>

                {book.status !== 'Completed' && (
                    <Button
                        className="bg-blue-500 text-white py-1 px-2 rounded-md mt-2"
                        onClick={() => getBookId(book)}
                    >
                        {book.status === 'Plan to Read' ? 'Update Plan to Read Status' : 'Update Reading Status'}
                    </Button>
                )}
            </CardBody>
        </Card>
    );
};

export default Bookcard;