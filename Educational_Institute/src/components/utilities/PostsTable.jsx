import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function PostsTable({props}) {

    const dateFormat = (date) =>{
        const tos = date
        if(date){
            const val = tos.substr(0, 10).split("-");
            return val[2] + "/" + val[1] + "/" + val[0];
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>User posts</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>S.N.</TableCell>
                        <TableCell>Post</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.map((item,index) => {
                            const date = dateFormat(item.date)
                            return (
                                <TableRow
                                    key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >   
                                    <TableCell>{index + 1}</TableCell>  
                                    <TableCell>{item.post}</TableCell>  
                                    <TableCell>{date}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}