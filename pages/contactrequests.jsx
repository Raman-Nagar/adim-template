import { Grid, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, } from "@mui/material";
import BaseCard from "../src/components/baseCard/BaseCard";
import mongoose from 'mongoose'
import ContactData from "../server/models/cotactShema";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Contact = ({ users }) => {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("admin")
        if (!token) {
            router.push("/adminlogin")
        }
    }, [])

    return (
        <>
            <Grid container spacing={0}>
                <Grid item xs={12} lg={12}>
                    <BaseCard title="All Users">
                        <Table
                            aria-label="simple table"
                            sx={{
                                mt: 3,
                                whiteSpace: "wrap",
                            }}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">
                                        <Typography color="textSecondary" variant="h6">
                                            Name
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography color="textSecondary" variant="h6">
                                            Email
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography color="textSecondary" variant="h6">
                                            Number
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography color="textSecondary" variant="h6">
                                            Subject
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Typography color="textSecondary" variant="h6">
                                            Message
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((product) => (
                                    <TableRow key={product._id}>

                                        <TableCell align="center">
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontSize: "15px",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                {product.name}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Typography variant="h6"
                                                sx={{
                                                    fontWeight: "500",
                                                }}>
                                                {product.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center"  >
                                            <Typography variant="h6">
                                                {product.number}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" >
                                            <Typography variant="h6">
                                                {product.subject}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="center" className="flex flex-wrap overflow-hidden">
                                            <Typography variant="h6"
                                                sx={{
                                                    fontWeight: "500",
                                                }}>{product.message}</Typography>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </BaseCard>
                </Grid>
            </Grid>
        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        const MONGODB_URI = process.env.MONGODB_URI
        await mongoose.connect(MONGODB_URI)
    }
    let users = await ContactData.find({})

    return {
        props: { users: JSON.parse(JSON.stringify(users)) },
    }
}

export default Contact