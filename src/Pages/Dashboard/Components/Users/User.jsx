import React, { useEffect, useState } from 'react'

// MUI | ANT-D :
import { Button } from 'antd';

// Components :
import Table from './Component/table/Table'
import ProfileModal from "../../../../Components/ProfileModal/ProfileModal"

// Assets | ICONS :
import Avater from "../../../../Assets/Images/profile.jpg";
import { RiEdit2Fill } from 'react-icons/ri';
import { BiShow } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';

// API :
import { GetAllUsersAPI } from '../../../../API/user'
// Helpers :
import { toast } from "react-toastify";

// CSS :
import './Users.scss'





const User = () => {

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchInput, setSearchinput] = useState("")

    const [selectedUser, setSelectedUser] = useState(null)
    const [showProfileModal, setShowProfileModal] = useState(false)
    const [reload, setReload] = useState(false)


    const openProfileModal = (data) => {
        if (data) {
            setSelectedUser(data)
        } else {
            setSelectedUser(null)
        }
        setShowProfileModal(true)
    }
    const closeProfileModal = () => {
        setShowProfileModal(false)
        setSelectedUser(null)
        setReload(!reload)
    }

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render: (_, data) => <> <div className="avaterBox"> <img src={Avater} alt="ERROR" /> </div> </>
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            render: (_, data) => `${data?.firstName} ${data.lastName}`,
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Role',
            dataIndex: 'roles',
            key: 'roles',
            render: (_, data) => data?.roles && data.roles?.length >= 1 ? <span style={{ color: 'var(--themeColorGreen)' }}> {data?.roles[0].name?.toLocaleUpperCase()}</span> : <span style={{ color: 'red' }}> {data?.type.toLocaleUpperCase()} </span>,
            // sorter: (c, d) => c.type.localeCompare(d.type)
        },
        // {
        //     title: 'Status',
        //     dataIndex: 'state',
        //     key: 'state',
        //     render:(_,data) => console.log("**********************" , data),
        //     // sorter: (c, d) => c.role.localeCompare(d.role)
        // },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            align: "center",
            render: (_, data) => data?.id != "1" && <>
                <div className="actionBox">
                    <div className="actionBtn">
                        <RiEdit2Fill className='icon cursor' onClick={() => openProfileModal(data)} />
                    </div>
                    {/* <div className="actionBtn">
                        <MdDelete className='icon cursor' />
                    </div> */}
                </div>
            </>

        },

    ]


    const onchangeSearchHandler = (event) => {
        let { value } = event.target;
        setSearchinput(value)
    }
    useEffect(() => {
        if (data) {
            setFilteredData(
                data.filter(val => `${val.firstName} ${val.lastName}`.toLocaleLowerCase().includes(searchInput?.toLocaleLowerCase()))
            )
        }
    }, [data, searchInput])

    const gettingAllUsers = async () => {
        setLoading(true)
        let res = await GetAllUsersAPI()
        if (res.error != null) {
            toast.error(res.error);
        } else {
            setData(res?.data?.data?.users || [])
            setFilteredData(res?.data?.data?.users || [])
        }
        setLoading(false)
    }
    useEffect(() => {
        gettingAllUsers()
    }, [reload])
    return (

        <>
            <div className="dashboardUsersContainer">
                <div className="flexLineSpace">
                    <div className="heading upper">
                        Users
                    </div>
                    <Button className='greenBtn' style={{ width: "120px" }} onClick={() => openProfileModal(null)}> Add User </Button>
                </div>
                <div className="table">
                    <Table
                        loading={loading}
                        rows={filteredData}
                        columns={columns}
                        hasSearch
                        onchangeSearchHandler={onchangeSearchHandler}
                    />
                </div>
            </div>
            <ProfileModal openModal={showProfileModal} selectedUser={selectedUser} closeModal={closeProfileModal} />
        </>
    )
}

export default User;