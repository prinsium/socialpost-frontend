  import { Avatar, Card, Divider, IconButton, Stack, Typography, Link} from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { AiOutlineUsergroupAdd } from "react-icons/ai";
  import { MdRefresh } from "react-icons/md";
  import { getRandomUsers } from "../api/users";
  import Loading from "./Loading";
  import UserAvatar from "./UserAvatar";
  import HorizontalStack from "./util/HorizontalStack";
  
  const FindUsers = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
  
    const fetchUsers = async () => {
      setLoading(true);
      const data = await getRandomUsers({ size: 9 });
      setLoading(false);
      setUsers(data);
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    const handleClick = () => {
      fetchUsers();
    };
  
    return (
      <Card variant="outlined" >
        <Stack spacing={2} sx={{ p:2}}>
          <HorizontalStack justifyContent="space-between">
            <HorizontalStack>
              <AiOutlineUsergroupAdd />
              <Typography>Suggested for you</Typography>
            </HorizontalStack>
            <IconButton
              sx={{ padding: 0 }}
              disabled={loading}
              onClick={handleClick}
            >
              <MdRefresh />
            </IconButton>
          </HorizontalStack>
  
          <Divider />
  
          {loading ? (
            <Loading />
          ) : (
            users &&
            users.map((user) => (
              <HorizontalStack justifyContent="space-between" key={user._id}>
                <HorizontalStack>
                  <UserAvatar width={30} height={30} username={user.username} />
                  <Typography > 
                    <Link underline="none" color="inherit" href={"/users/" + user.username}>
                      {user.username}
                    </Link>
                    </Typography>
                </HorizontalStack>
              </HorizontalStack>
            ))
          )}
        </Stack>
      </Card>
    );
  };
  
  export default FindUsers;