import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Paginate({count, update, pageCurrently}){

    return (
        <Stack spacing={2}>
            <Pagination count={count} color="primary" onChange={update} page={pageCurrently}/>
        </Stack>
    )
}