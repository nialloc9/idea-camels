run_client_tests:
	cd packages/client && CI=true npm run test

run_tests:
	make run_client_tests