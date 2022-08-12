import React from 'react'
import { useEffect } from 'react'
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableData from '../../compnents/TableData/TableData';
import { getListUser } from '../../services/getListUser'

export default function HomeManagement() {
    const dispatch = useDispatch();

    const titleData = [
        { name: 'id', field: "User ID", sortable: 'none' },
        { name: 'name', field: "User Name", sortable: 'none' },
        { name: 'phone', field: "Phone Number", sortable: 'none' },
        { name: 'email', field: "User Email", sortable: 'none' },
        { name: 'type', field: "Role", sortable: 'none' },
    ]

    useEffect(() => {
        getListUser(dispatch);
    }, []);

    const listUser = useSelector(state => state.user.listUser);

    return (
        <Container>
            <h3>User Mangement</h3>
            <TableData listUser={listUser} titleData={titleData} />
        </Container>
    )
}
