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

SHOULD_CONFIGURE_INFRASTRUCTURE="${SHOULD_CONFIGURE_INFRASTRUCTURE:-y}"
SHOULD_CONFIGURE_CLIENT="${SHOULD_CONFIGURE_CLIENT:-y}"
SHOULD_CONFIGURE_CAMPAIGN="${SHOULD_CONFIGURE_CAMPAIGN:-y}"
SHOULD_RUN_POST_BUILD="${SHOULD_RUN_POST_BUILD:-y}"

make init-experiment

if [ $SHOULD_CONFIGURE_INFRASTRUCTURE == "y" ]
then
make configure-infrastructure
fi


if [ $SHOULD_CONFIGURE_CLIENT == "y" ]
then
make configure-client
fi

if [ $SHOULD_CONFIGURE_CAMPAIGN == "y" ]
then
make configure-campaign
fi

if [ $SHOULD_RUN_POST_BUILD == "y" ]
then
make post-build
fi
