import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Accordion, AccordionDetails, AccordionSummary, CardActions, CardHeader, Chip, InputLabel, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField, Toolbar } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpandMore } from '@mui/icons-material';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  { headerName: 'Date', field: 'date', type: 'date', width: 150 },
  { headerName: 'Title', field: 'title', flex: 1 },
  { headerName: 'From', field: 'from', width: 150 },
  { headerName: 'Status', field: 'status', width: 150, renderCell: (params) => params.value === STATUS.BOOKED ? <Chip color="success" size='small' label="Booked" /> : <Chip color="warning" size='small' label="Missing" /> },
  { headerName: 'Expense', field: 'expense', type: 'number', width: 150, }
];

enum STATUS {
  BOOKED = "booked",
  MISSING = "missing",
}

export function BudgetDiff() {
  let navigate = useNavigate()
  const [processedBank, setProcessedBank] = useState([])
  const [processedBudget, setProcessedBudget] = useState([])
  const [bank, setBank] = useState(null)
  const [budget, setBudget] = useState(null)
  const [unpaired, setUnpaired] = useState([])
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  const handleFileRead = (event: ChangeEvent<HTMLInputElement>, source: 'bank' | 'budget') => {
    const fileReader = new FileReader();
    const target = event.target

    if (target.files !== null) {
      fileReader.readAsText(target.files[0]);
      fileReader.onload = (e) => {
        if (source === 'bank')
          setBank(e.target.result)
        else
          setBudget(e.target.result)
        console.log(e.target.result);
      };
    }
  }

  const convertBudgetCSV = () => {
    const rows = budget
      .split("\n")
      .slice(1)
      .map(x => x.split(","))
      .filter(x => x[0] !== "")
      .map((row, i) => {
        return ({
          id: i,
          date: new Date(row[0]),
          title: [row[1], row[2]].join(" "),
          from: row[4],
          status: STATUS.BOOKED,
          expense: Number(row[3].replaceAll("\"", "").trim())
        })
      })
    console.log(rows);
    setProcessedBudget(rows)
  }

  const convertBankCSV = () => {

    const rows = bank
      .split("\n")
      .slice(1)
      .map(x => x.split(","))
      .filter(x => x[0] !== "")
      .map((row, i) => {
        const value = row.length === 10 ? row[6] : row[5]
        return ({
          id: i,
          date: new Date(row[4]),
          title: row[3],
          from: "Takarek",
          status: STATUS.BOOKED,
          expense: Number(value.replaceAll("\"", "").replaceAll("-", "").replaceAll(" ", "").trim())
        })
      })
    console.log(rows);
    setProcessedBank(rows)
  }

  const process = () => {
    convertBankCSV()
    convertBudgetCSV()
  }

  useEffect(() => {
    if (processedBank.length && processedBudget.length) {
      const pairless = processedBank.filter(bankItem => {
        const hit = processedBudget.find(budgetItem => {
          return budgetItem.expense === bankItem.expense
        })
        return !hit
      })
      console.log(pairless);

      setUnpaired(pairless.map(x => ({ ...x, status: STATUS.MISSING })));
    }
  }, [processedBank, processedBudget])

  const handleToggleStatus = (status: STATUS) =>
    rowSelectionModel.forEach(id => {
      const item = unpaired.find(x => x.id === id)
      if (item)
        item.status = status
    })

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant='h3' gutterBottom>Budget Differences</Typography>
      <Card sx={{ mb: 2 }}>
        <CardHeader title="Files" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <InputLabel>From Bank (.csv)</InputLabel>
              <TextField fullWidth hiddenLabel type='file' onChange={e => handleFileRead(e, 'bank')} helperText={<>Click <Link href='https://www.convertcsv.com/html-table-to-csv.htm' target='_blank'>here</Link> to convert HTML to CSV</>} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel>From Budget (.csv)</InputLabel>
              <TextField fullWidth hiddenLabel type='file' onChange={e => handleFileRead(e, 'budget')} />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button onClick={process}>Show Diff</Button>
        </CardActions>
      </Card>

      <Card>
        <CardHeader title="Diff" />
        <CardContent>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Processed Bank Items ({processedBank.length} items)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataGrid
                sx={{ height: 500 }}
                rows={processedBank}
                columns={columns}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Processed Budget Items ({processedBudget.length} items)</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <DataGrid
                sx={{ height: 500 }}
                rows={processedBudget}
                columns={columns}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography>Items wo match (count: {unpaired.length}, total expenses: {unpaired.filter(x => x.status === STATUS.MISSING).reduce((a, c) => a + c.expense, 0)})</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Toolbar disableGutters>
                <Button sx={{ mr: 1 }} onClick={() => handleToggleStatus(STATUS.BOOKED)}>Booked</Button>
                <Button sx={{ mr: 1 }} onClick={() => handleToggleStatus(STATUS.MISSING)}>Missing</Button>
              </Toolbar>
              <DataGrid
                sx={{ height: 500 }}
                rows={unpaired}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                  setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
              />
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Container>
  );
}

export default BudgetDiff