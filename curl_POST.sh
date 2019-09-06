#! /bin/sh
#
#	$ ./curl_POST.sh
#	{
#	  "postData": {
#		"name": "postData",
#		"contents": "1567780515, 1, 3",
#		"length": 16,
#		"type": "application/x-www-form-urlencoded"
#	  },
#	  "parameters": {
#		"1567780515, 1, 3": [
#		  ""
#		],
#		"sheet": [
#		  "PIRsheet"
#		]
#	  },
#	  "queryString": "sheet=PIRsheet",
#	  "contentLength": 16,
#	  "contextPath": "",
#	  "parameter": {
#		"1567780515, 1, 3": "",
#		"sheet": "PIRsheet"
#	  }
#	}

webapp_id='AKfycbxQSxOOfBtZLUqUn4GHxG2jJeCLgCCSAW7Tj1cJV8j2ltHP4f8'
worksheet='PIRsheet'

webapp_url="https://script.google.com/macros/s/$webapp_id/exec"
post_url="$webapp_url?sheet=$worksheet"
use_jq=0

do_init() {
	which jq >/dev/null && use_jq=1 || use_jq=0
}

do_post() {
	local timestamp=`date +%s`
	local pir_value=$(((`echo $RANDOM`)%2))		# 0-1
	local is_present=$(((`echo $RANDOM`)%2+2))	# 2-3

	local post_data="${timestamp}, ${pir_value}, ${is_present}"

	if [ "$use_jq" -eq 1 ]; then
		curl -s -L --data "$post_data" "$post_url" | jq .
	else
		curl -s -L --data "$post_data" "$post_url"
	fi
}

do_main() {
	do_init && \
	do_post
}

do_main
