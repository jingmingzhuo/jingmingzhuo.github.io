#!/usr/bin/env bash
set -euo pipefail

ENV_NAME="jekyll-bulma-homepage"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if ! command -v conda >/dev/null 2>&1; then
  echo "Conda is required but was not found in PATH."
  exit 1
fi

source "$(conda info --base)/etc/profile.d/conda.sh"

conda env create -f "$ROOT_DIR/environment.yml" || \
  conda env update -n "$ENV_NAME" -f "$ROOT_DIR/environment.yml" --prune

set +u
conda activate "$ENV_NAME"
set -u

if [[ "${USE_RUBY_CHINA_MIRROR:-0}" == "1" ]]; then
  gem sources --add https://gems.ruby-china.com --remove https://rubygems.org/ >/dev/null 2>&1 || true
fi

mkdir -p "$CONDA_PREFIX/share/rubygems/bin"
ln -sf "$CONDA_PREFIX/bin/ruby" "$CONDA_PREFIX/share/rubygems/bin/ruby"

RUBY_CC="$(ruby -rrbconfig -e 'print RbConfig::CONFIG["CC"]')"
RUBY_CXX="$(ruby -rrbconfig -e 'print RbConfig::CONFIG["CXX"]')"

if ! command -v "$RUBY_CC" >/dev/null 2>&1; then
  if command -v clang-21 >/dev/null 2>&1; then
    ln -sf "$(command -v clang-21)" "$CONDA_PREFIX/bin/$RUBY_CC"
  else
    ln -sf "$(command -v clang)" "$CONDA_PREFIX/bin/$RUBY_CC"
  fi
fi

if ! command -v "$RUBY_CXX" >/dev/null 2>&1; then
  if command -v clang++-21 >/dev/null 2>&1; then
    ln -sf "$(command -v clang++-21)" "$CONDA_PREFIX/bin/$RUBY_CXX"
  else
    ln -sf "$(command -v clang++)" "$CONDA_PREFIX/bin/$RUBY_CXX"
  fi
fi

gem install eventmachine -v 1.2.7 --no-document
gem install jekyll -v 4.3.4 --no-document
gem install webrick -v 1.8.1 --no-document

echo "Environment is ready."
echo "Activate with: conda activate $ENV_NAME"
