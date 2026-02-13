"use client";

import { useEffect, useState } from "react";
import {
  Button,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import type { Filters } from "@/lib/filters";

type FilterBarProps = {
  basePath: string;
  filters: Filters;
  active: boolean;
};

const FilterBar = ({ basePath, filters, active }: FilterBarProps) => {
  const router = useRouter();
  const [minScore, setMinScore] = useState(filters.minScore);
  const [minComments, setMinComments] = useState(filters.minComments);
  const [timeRange, setTimeRange] = useState<Filters["timeRange"]>(
    filters.timeRange
  );
  const [domain, setDomain] = useState(filters.domain);

  useEffect(() => {
    setMinScore(filters.minScore);
    setMinComments(filters.minComments);
    setTimeRange(filters.timeRange);
    setDomain(filters.domain);
  }, [filters]);

  const apply = () => {
    const params = new URLSearchParams();
    if (minScore > 0) params.set("minScore", String(minScore));
    if (minComments > 0) params.set("minComments", String(minComments));
    if (timeRange !== "all") params.set("timeRange", timeRange);
    if (domain.trim()) params.set("domain", domain.trim());
    params.set("page", "1");
    const query = params.toString();
    router.push(query ? `${basePath}?${query}` : basePath);
  };

  const clear = () => {
    router.push(basePath);
  };

  return (
    <Paper
      variant="outlined"
      sx={{ p: 2 }}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          apply();
        }
      }}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", md: "center" }}
      >
        <TextField
          label="Min score"
          type="number"
          value={minScore}
          onChange={(event) => setMinScore(Number(event.target.value))}
          inputProps={{ min: 0 }}
          sx={{ width: { xs: "100%", md: 140 } }}
        />
        <TextField
          label="Min comments"
          type="number"
          value={minComments}
          onChange={(event) => setMinComments(Number(event.target.value))}
          inputProps={{ min: 0 }}
          sx={{ width: { xs: "100%", md: 160 } }}
        />
        <TextField
          select
          label="Time range"
          value={timeRange}
          onChange={(event) =>
            setTimeRange(event.target.value as Filters["timeRange"])
          }
          sx={{ width: { xs: "100%", md: 160 } }}
        >
          <MenuItem value="all">All time</MenuItem>
          <MenuItem value="24h">Last 24h</MenuItem>
          <MenuItem value="7d">Last 7 days</MenuItem>
          <MenuItem value="30d">Last 30 days</MenuItem>
        </TextField>
        <TextField
          label="Domain"
          placeholder="example.com"
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">https://</InputAdornment>
            ),
          }}
          sx={{ flex: 1 }}
        />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button variant="contained" onClick={apply}>
            Apply
          </Button>
          {active ? (
            <Button variant="text" onClick={clear}>
              Clear
            </Button>
          ) : null}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default FilterBar;
