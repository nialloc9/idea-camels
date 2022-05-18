#
# This script creates a new experiment from a template
# 
# ENV VARIABLES
# DOMAIN -> Domain name e.g ideacamels.com
# ENV -> Environment e.g prod
# EXPERIMENT_REF -> The experiment ref from the database e.g 1
# TEMPLATE_REF -> The template ref from the database e.g 1
# CALLER -> Unique ID for this task e.g hfdahaj44
# DESCRIPTION -> description of ad
# HEADLINE -> Headline for ad
# HEADLINE_2 -> Headline 2 for ad
# BUDGET -> Budget for ad
# KEYWORD_{0 - 6} -> Set of keywords for ad
#
set -e

make init-experiment
# make configure-infrastructure
# make configure-client
make configure-campaign
make post-build