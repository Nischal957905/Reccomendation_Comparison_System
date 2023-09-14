import { useGetAdminShowListQuery, useDeletePostAdminQuery } from "../../app/api/adminSlice"
import Paginate from "../../components/pagination/Paginate"
import { useEffect, useState } from "react"
import { LinearProgress } from "@mui/material";

//Tabs
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

//table
import TableProp from "../../components/utilities/TableProp";
import DeleteConfirm from '../../components/form/DeleteConfirm';

export default function Admin() {

    const [pageValue, setPageValue] = useState({
        page: 1,
    })

    const {
        data,
        isSuccess,
        isloading,
        refetch,
    } = useGetAdminShowListQuery(pageValue)

    const {structuredInstitution, structuredCollege, structuredSchool, totalPage} = data ? data : []
    
    const handleMovePage = (event, newPage) => {
        if (newPage >= 1 && newPage <= totalPage) {
            setPageValue({
                page: newPage
            })
        }
    }

    const [tabValue, setTabValue] = useState("1")
    const tabSwappingHandler = (event, newVal) => {
        setTabValue(newVal)
    }

    const [deleteValue, setDeleteValue] = useState()
    const [deleteState, setDeleteState] = useState(false)
    const [delayedDeleteValue, setDelayedDeleteValue] = useState({})

    const {
        data: delData,
        isSuccess: success,
        isLoading
    } = useDeletePostAdminQuery(deleteValue)

    const handleDelete = (category, deletion) => {
        setDeleteState(true)
        setDelayedDeleteValue({
            delete: deletion,
            category: category,
        })
    }

    useEffect(() => {
        if(delData === "Deleted"){
            refetch()
        }
    },[isLoading])

    const deletionConfirmation = () => {
        setDeleteValue(delayedDeleteValue)
        if(success){
            refetch()
        }
        setDeleteState(false)
        handleMessageType('deleted', 'success')
        showPopMessage()
    }

    const closeDeletePopUp = () => {
        setDeleteState(false)
    }
    

    return (
        <div>
            {
                isloading &&
                <LinearProgress />
            }
            <DeleteConfirm
                closeForm={closeDeletePopUp}
                formPopStatus={deleteState}
                formSubmit={deletionConfirmation}
            />
            <div>
                <Box>
                    <TabContext value={tabValue}>
                        <Box sx={{borderBottom:1, borderColor:"divider"}}>
                            <TabList onChange={tabSwappingHandler}>
                                <Tab value="1" label="Institution"/>
                                <Tab value="2" label="College"/>
                                <Tab value="3" label="School"/>
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            {
                                isSuccess && structuredInstitution.length > 0 ? (
                                    <TableProp
                                        institutionList={structuredInstitution} 
                                        link='new/consultancy'
                                        deletion = {handleDelete}
                                        category = "consultancy"
                                        editLink = "/admin/edit/institution/"
                                    />
                                ) : (
                                    <div>No data To show</div>
                                )
                            }
                        </TabPanel>
                        <TabPanel value="2">
                            {
                                isSuccess && structuredCollege.length > 0 ? (
                                    <TableProp
                                        institutionList={structuredCollege} 
                                        link='new/college'
                                        deletion = {handleDelete}
                                        category = "college"
                                        editLink = "/admin/edit/college/"
                                    />
                                ) : (
                                    <div>No data To show</div>
                                )
                            }
                        </TabPanel>
                        <TabPanel value="3">
                            {
                                isSuccess && structuredSchool.length > 0 ? (
                                    <TableProp
                                        institutionList={structuredSchool} 
                                        link='new/school'
                                        deletion = {handleDelete}
                                        category = "school"
                                        editLink = "/admin/edit/school/"
                                    />
                                ) : (
                                    <div>No data To show</div>
                                )
                            }
                        </TabPanel>
                    </TabContext>
                </Box>
            </div>
            <div className="pagein">
            { isSuccess &&
                <Paginate
                    count = {totalPage}
                    update = {handleMovePage}
                    pageCurrently={pageValue.page}
                />
            }
            </div>
        </div>
    )
}