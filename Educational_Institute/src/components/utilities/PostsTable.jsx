import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function PostsTable({props}) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>S.N.</TableCell>
                        <TableCell>Post</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.map((item,index) => {
                            return (
                                <TableRow
                                    key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >   
                                    <TableCell>{index + 1}</TableCell>  
                                    <TableCell>{item.post}</TableCell>  
                                    <TableCell>{item.date}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}