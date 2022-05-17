When the infrasturcture is deployed it creates a PEM file to access the bastion. Use the bash commands in the makefile to proxy via bastion to the prod database.

PEM file created during deployment via cicd will be available for 5 days and then removed.

# DEBUG

- If recieving `open failed: administratively prohibited: open failed` change the port being forwarded to locally