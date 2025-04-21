#!/bin/bash

# 환경 변수 설정 (.env 파일에서 가져오기)
set -a
source .env
set +a

# 기본 API 설정
export OPENAI_API_BASE="https://api.openai.com/v1"

# LiteLLM 서버 실행
source litellm_env/bin/activate
litellm --config litellm_config.yaml --port 8000
