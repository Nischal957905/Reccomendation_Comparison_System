import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom'
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

export default function TableProp({institutionList, link, deletion, category, editLink}) {

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={link}>
                                <Button>Create New</Button>
                            </Link>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                            <Link to="/admin/user">
                                <Button>Users</Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Delete</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        institutionList.map((item) => {
                            return (
                                <TableRow
                                    key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >   
                                    <TableCell>
                                        <IconButton color='primary' onClick={() => deletion(category,item._id)}><DeleteSweepIcon/></IconButton>
                                    </TableCell>  
                                    <TableCell>{item._id}</TableCell>  
                                    <TableCell>{item.name}</TableCell>  
                                    <TableCell>
                                        <Link to={`${editLink}${item._id}`}><EditIcon/></Link>
                                    </TableCell>                              
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}