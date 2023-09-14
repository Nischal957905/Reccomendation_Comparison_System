import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import BlockIcon from '@mui/icons-material/Block';
import { LiaCrownSolid } from 'react-icons/lia';


export default function AdminUserTable({props, deletion}) {

    const admin = '64e4c30593fb86fc6472fa18';

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Users</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        
                        <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Posts</TableCell>
                        <TableCell>Id</TableCell>
                        <TableCell>Username</TableCell>
                        <TableCell>Status</TableCell>
                        
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        props.map((item) => {
                            return (
                                <TableRow
                                    key={item._id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >   
                                    <TableCell>
                                        <Link to={`/admin/edit/user/${item._id}`}><IconButton><RemoveRedEyeIcon/></IconButton></Link>
                                    </TableCell>  
                                    <TableCell>{item._id}</TableCell>  
                                    <TableCell>{item.role_id === admin && <LiaCrownSolid />}{item.username}</TableCell>  
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        {
                                            item.role_id !== admin &&
                                        <IconButton color='primary' onClick={() => deletion(item._id)}><BlockIcon/>
                                        </IconButton>
                                        }
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