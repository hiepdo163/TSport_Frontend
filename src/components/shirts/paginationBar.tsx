
import { Pagination } from "@nextui-org/react";


type Props = {
    totalPages: number;
}

const PaginationBar = ({totalPages}: Props) => {
    
    return (
        <Pagination color="danger" showControls total={totalPages} initialPage={1} />
    );
};

export default PaginationBar;