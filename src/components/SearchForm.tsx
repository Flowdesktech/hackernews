"use client";

import { InputAdornment, Paper, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SearchFormProps = {
  initialQuery: string;
};

const SearchForm = ({ initialQuery }: SearchFormProps) => {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  const submit = () => {
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}&page=1`);
  };

  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <Stack>
        <TextField
          fullWidth
          label="Search stories"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submit();
            }
          }}
          helperText="Press Enter to search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Paper>
  );
};

export default SearchForm;
